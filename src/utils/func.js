import { color } from '../components/color';

const getColorByStatus = (n) => {
    switch (n) {
        case 1: {
            return color.green;
        }
        case 2: {
            return color.red;
        }
        case 3: {
            return color.yellow;
        }
        default: {
            return color.red;
        }
    }
}

export {
    getColorByStatus
}