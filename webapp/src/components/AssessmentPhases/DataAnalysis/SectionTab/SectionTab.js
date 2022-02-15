import React from 'react'
import classes from './SectionTab.module.css'
import PropTypes from 'prop-types'
import ChevronRight from '../../../../Assets/Icons/chevron-right.svg'

const SectionTab = (props) => {

    const tabStyle = !props.isSelected ? classes.Tab : [classes.Tab, classes.Selected].join(' ')
    return (
        <li className={tabStyle} onClick={() => props.setSelectedSection(props.title)}>
            <span>{props.title}</span>
            <img src={ChevronRight} alt="chevron right" />
        </li>
    )
}

SectionTab.propTypes = {
    title: PropTypes.string,
    isSelected: PropTypes.bool
}

export default SectionTab