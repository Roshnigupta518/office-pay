import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import {lightTheme} from '../../../global/Theme';
import {globalStyles} from '../../../global/Styles';

export default class PaginatedSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: props.activeSlide || 0,
    };
  }

  componentDidUpdate = prevProps => {
    if (this.props.activeSlide !== prevProps.activeSlide) {
      this.setState({
        activeSlide: this.props.activeSlide,
      });
    }
  };

  pagination = () => {
    const {entries, dotStyle, paginationCont, inactiveDotStyle} = this.props;
    const {activeSlide} = this.state;

    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={[styles.paginationCont, paginationCont]}
        dotStyle={[styles.dotStyle, dotStyle]}
        inactiveDotStyle={(styles.inactiveDotStyles, inactiveDotStyle)}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
      />
    );
  };

  render() {
    const {
      autoplay,
      slideStyle,
      slideAlign,
      itemWidth,
      sliderWidth,
      loop,
      setRef,
    } = this.props;
    const RenderItem = this.props.renderItem;
    const RenderPagination = this.pagination;

    return (
      <View style={[styles.container, globalStyles.placeCenter]}>
        <Carousel
          {...this.props}
          ref={setRef}
          data={this.props.entries}
          removeClippedSubviews={false}
          renderItem={props => <RenderItem {...props} />}
          sliderWidth={
            sliderWidth ? sliderWidth : Dimensions.get('window').width
          }
          slideStyle={[globalStyles.placeCenter, slideStyle]}
          itemWidth={
            itemWidth ? itemWidth : Dimensions.get('window').width * 0.9
          }
          activeSlideAlignment={slideAlign ? slideAlign : 'center'}
          autoplay={autoplay}
          loop={loop}
          onSnapToItem={index => this.setState({activeSlide: index})}
        />
        <RenderPagination />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: lightTheme.PRIMARY_COLOR,
  },
  inactiveDotStyles: {
    backgroundColor: lightTheme.SECONDARY_TEXT,
  },
  paginationCont: {
    position: 'absolute',
    bottom: -15,
    width: '50%',
  },
});
