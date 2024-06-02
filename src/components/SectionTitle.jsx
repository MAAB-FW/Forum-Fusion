import React from "react"
import PropTypes from "prop-types"

const SectionTitle = ({ title }) => {
    return <h2 className="text-4xl text-center font-bold">{title}</h2>
}

export default SectionTitle

SectionTitle.propTypes = {
    title: PropTypes.string,
}
