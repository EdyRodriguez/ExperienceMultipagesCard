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

    const go = (route) => {
        if (cardControl?.navigateToPage) {
            // En este scaffold: pasa un objeto con { route }
            cardControl.navigateToPage({ route });
        } else {
            console.warn('navigateToPage no está disponible en cardControl');
        }
    };

    return (
        <div className={classes.card}>
            <Typography variant="h2">Hello MultiPages World</Typography>

            <div className={classes.row}>
                <Button onClick={() => go('/pokeapi')}>POKEAPI</Button>
                <Button onClick={() => go('/ethos')}>ETHOS JWT</Button>
                <Button onClick={() => go('/placeholder')}>PLACEHOLDER</Button>
            </div>
        </div>
    );
};

MultiPagesCard.propTypes = {
    classes: PropTypes.object.isRequired,
    cardControl: PropTypes.object
};

export default withStyles(styles)(MultiPagesCard);
