import { Dimensions, PixelRatio, Platform } from "react-native";
const {width, height} = Dimensions.get('window');

const baseFontSize = 14;
const baseWidth = 430;
const baseHeight = 932;


export function wp(percentage: number) {
    const value = (percentage * width) / 100;
    return Math.round(value);
  }
  
  export function hp(percentage: number) {
    const value = (percentage * height) / 100;
    return Math.round(value);
  }
  export const fontScale = (fontSize: number) => {
    const widthScale = width / baseWidth;
    const heightScale = height / baseHeight;
    
    const scale = Math.min(widthScale, heightScale);
    
    const newSize = fontSize * scale;
    
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


  export const SIZES ={
    width,
    height
  }