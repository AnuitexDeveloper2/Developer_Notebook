import { configure } from '@testing-library/react';
import { configure as configureEnzyme } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import '@testing-library/jest-dom';

configure({
    testIdAttribute: 'automation-id',
});

configureEnzyme({ adapter: new Adapter() });

expect.extend({
    toHaveBeenCalledOnceWith(expectItem, ...args) {
        try {
            expect(expectItem).toHaveBeenCalledTimes(1);
        } catch (e) {
            return e.matcherResult;
        }

        try {
            expect(expectItem).toHaveBeenCalledWith.apply(null, args);
        } catch (e) {
            return e.matcherResult;
        }

        return {
            message: () => '',
            pass: true,
        };
    },
});

Object.defineProperty(window, 'matchMedia', {
    value: () => {
        return {
            matches: false,
            addListener: () => {},
            removeListener: () => {},
        };
    },
});
