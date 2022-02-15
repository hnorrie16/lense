import React from 'react'
import classes from './SectionTab.module.css'
import PropTypes from 'prop-types'
import ChevronRight from '../../../../Assets/Icons/chevron-right.svg'

const SectionTab = React.memo((props) => {

    const tabStyle = !props.isSelected ? classes.Tab : [classes.Tab, classes.Selected].join(' ')
    // console.log(props.invalid, props.title)
    return (
        <li className={tabStyle} onClick={() => props.setSelectedSection(props.title)}>
            <span>{props.title}</span>
            {!props.invalid ? <img src={ChevronRight} alt="chevron right" />
                : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(197, 0, 0)" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>}
        </li>
    )
})

SectionTab.propTypes = {
    title: PropTypes.string,
    isSelected: PropTypes.bool
}

export default SectionTab