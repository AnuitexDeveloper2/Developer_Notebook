import React from 'react';
import { ProgressBarContainer, ProgressBarLine, ProgressBarWrapper } from './ProgressBar.styles';

interface Props {
    text: string;
}
const ProgressBar: React.FC<Props> = ({ text }) => {
    return (
        <ProgressBarContainer>
            <ProgressBarWrapper>
                <ProgressBarLine>
                    {text}
                </ProgressBarLine>
            </ProgressBarWrapper>
        </ProgressBarContainer>
    );
};

export default ProgressBar;
