import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class WonderStormTitle extends Component {

    render() {
        return (
            <div className="weather__title">
                    W<span>
                        <FontAwesomeIcon icon="cloud" />
                    </span>nderSt<span>
                        <FontAwesomeIcon icon="cloud" /></span>rm
            </div >);
    }
}

export default WonderStormTitle;



