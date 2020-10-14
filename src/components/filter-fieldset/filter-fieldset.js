import styled from 'styled-components';
import { breakPoints, colours, padding } from '../../utils/theme';

const FilterFieldsetStyled = styled.div`
  align-items: flex-start;
  background-color: ${colours.lightGreyAlpha};
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  padding: ${padding.normal};

  & + div {
    border-left: 1px solid ${colours.darkGrey};
  }

  h2 {
    flex-basis: 100%;
    margin: 0;
  }

  @media all and (min-width: ${breakPoints.medium}) {
    & + div {
      border-left: 0 none;
      border-top: 1px solid ${colours.darkGrey};
    }
  }
`;

export default FilterFieldsetStyled;
