import styled from 'styled-components';
import theme from '../calendarTheme';

const className = 'app-CalendarLegend';

const CalendarLegendOverrides = styled.div.attrs({ className })`
  margin-top: 10px;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  & .color-box {
    width: 30px;
    height: 30px;
    margin: 0 auto;

    align-self: center;
  }

  & .color-box__closed {
    background-color: ${theme.GRAY_LIGHT};
  }

  & .color-box__selection {
    background-color: ${theme.HEL_COAT};
    border: none;
  }

  & .color-box__taken {
    background-color: ${theme.RED};
    border: none;
  }

  & .color-box__available {
    background-color: ${theme.WHITE};
    border-top: 1px solid ${theme.GRAY};
    border-bottom: 1px solid ${theme.GRAY};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .dash {
    width: 100%;
    height: 1px;
    background: ${theme.GRAY_LIGHT};
  }
`;

export default CalendarLegendOverrides;
