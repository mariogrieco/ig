// @flow
import * as React from 'react'
import withTheme from 'hoc/withTheme'
import StepLayout from 'components/StepLayout'
import DonateOption from 'components/DonateOption'

import withForm from 'components/Form/Helpers/FormHOC'

import supportedThemes from './themes/__supportedThemes'

import PHONE from './images/Phone.svg'
import EI from './images/IE.svg'

function MaKeADonation ({
    handleDonateOnline,
    handleDonateCall,
    handleDonateEmail
}) {
    return (
        <StepLayout>
            <DonateOption
                description='You will be re-directed to our school’s online donation website.'
                title='Donate Online'
                icon={EI}
                onClick={handleDonateOnline}
            />
            <DonateOption
                description='One of our team members will contact you.'
                title='Phone Call'
                icon={PHONE}
                onClick={handleDonateCall}
            />
            <DonateOption
                title='Mail me a donation form instead'
                onClick={handleDonateEmail}
                center
            />
        </StepLayout>
    )
}

export default withForm()(withTheme(supportedThemes)(MaKeADonation))
