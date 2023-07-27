import React from "react";
import { SwitcherContainer, ToggleButtonCover } from "./Switcher.styles";

interface Props {
  onClick: () => void;
  value: boolean;
}

const Switcher: React.FC<Props> = ({onClick, value}) => {
  return (
    <SwitcherContainer className="switcher">
      <ToggleButtonCover>
        <div className="button-cover">
          <div className="button r" id="button-4">
            <input type="checkbox" className="checkbox" checked={value} onChange={onClick}/>
            <div className="knobs"></div>
            <div className="layer"></div>
          </div>
          
        </div>
      </ToggleButtonCover>
    </SwitcherContainer>
  );
};

export default Switcher;
