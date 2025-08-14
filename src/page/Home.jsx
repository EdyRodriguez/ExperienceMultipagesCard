import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, Button } from '@ellucian/react-design-system/core';
import PropTypes from 'prop-types';
import React from 'react';

const styles = () => ({
    card: {
        marginTop: 0,
        marginRight: spacing40,
        marginBottom: 0,
        marginLeft: spacing40
    },
    row: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        marginTop: spacing40
    }
});

const MultiPagesCard = (props) => {
    const { classes, cardControl } = props;

    const openPage = (path) => {
        cardControl?.navigateToPage?.('multipages', { path, state: { path } });
    };

    return (
        <div className={classes.card}>
            <Typography variant="h2">
                Workshop – Demos
            </Typography>

            <div className={classes.row}>
                <Button onClick={() => openPage('/pokeapi')}>PokeAPI</Button>
                <Button onClick={() => openPage('/ethos')}>Ethos JWT</Button>
                <Button onClick={() => openPage('/placeholder')}>Placeholder</Button>
            </div>
        </div>
    );
};

MultiPagesCard.propTypes = {
    classes: PropTypes.object.isRequired,
    cardControl: PropTypes.object
};

export default withStyles(styles)(MultiPagesCard);
