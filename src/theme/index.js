const baseValue = 8;
const deepBlue = "#233165";
const white = "#fff";
export const theme = {
  fonts: {
    heading: `'Baloo', cursive`,
    body: `'Lato', sans-serif`
  },
  colors: {
    primary: deepBlue,
    white: white
  },
  transition: {
    duration: "300ms"
  },
  layout: {
    container: {
      width: "1440px",
      padding: `${layoutCalc(baseValue, 3)}px`
    }
  },
  component: {
    button: {
      font: {
        size: `${layoutCalc(baseValue, 2)}px`,
        lineHeight: `${layoutCalc(baseValue, 3)}px`,
        weight: 400
      },
      padding: `${baseValue}px ${layoutCalc(baseValue, 3)}px`,
      radius: `${layoutCalc(baseValue, 3)}px`
    }
  }
};

function layoutCalc(value, multiplier) {
  return value * multiplier;
}
