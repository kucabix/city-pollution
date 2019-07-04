import React from 'react'
import PropTypes from 'prop-types'
import ClipLoader from 'react-spinners/ClipLoader'
import { css } from '@emotion/core'
import {Accordion,
        AccordionItem,
        AccordionItemHeading,
        AccordionItemButton,
        AccordionItemPanel,} from 'react-accessible-accordion'
import WikiData from './WikiData'

// using react-accessible-accordion to present data and returns cities descriptions from WikiData
const CityAccordion = props => {
  const accordionContent = props.citiesArray.map(item => {
      return(
        <AccordionItem key={item}>
         <AccordionItemHeading>
             <AccordionItemButton>
                 {item}
             </AccordionItemButton>
         </AccordionItemHeading>
         <AccordionItemPanel>
             <WikiData wikiItem={item} />
         </AccordionItemPanel>
        </AccordionItem>
    )
    })
    return(
      <div className='accordion-container'>
        <ClipLoader
          css={css`display: block;margin: 0 auto;`}
          loading={props.loading} />
        <Accordion className={props.className} allowZeroExpanded='true'>{accordionContent}</Accordion>
      </div>
    )
}

CityAccordion.propTypes = {
  citiesArray: PropTypes.array,
  loading: PropTypes.bool,
  className: PropTypes.string
}

export default CityAccordion
