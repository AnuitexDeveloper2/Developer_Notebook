import styled from 'styled-components';

export const AlertContainer = styled('div')`
    position: relative;
    z-index: 99999;
    justify-content: center;
    display: flex;
    .ant-alert {
        &.fixed {
            position: fixed;
        }
    }
`;
