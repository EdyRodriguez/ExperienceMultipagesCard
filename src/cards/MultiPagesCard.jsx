import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, Button } from '@ellucian/react-design-system/core';
import { useCardInfo } from '@ellucian/experience-extension-utils';
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
    const { cardId } = useCardInfo() || '123456';
    console.log('CARD ID:', cardId);

    // Navega a una ruta; opcionalmente agrega ?cardId=<id>
    const go = (route, { appendCardId = false } = {}) => {
        if (!cardControl?.navigateToPage) {
            console.warn('navigateToPage no está disponible en cardControl');
            return;
        }

        let finalRoute = route;
        if (appendCardId && cardId) {
            finalRoute = `${route}${route.includes('?') ? '&' : '?'}cardId=${encodeURIComponent(cardId)}`;
        }

        cardControl.navigateToPage({ route: finalRoute });
    };

    const goWithOptionalCardId = (routeBase) => {
  const route = cardId ? `${routeBase}/card/${encodeURIComponent(cardId)}` : routeBase;
  cardControl.navigateToPage({ route });
};

    return (
        <div className={classes.card}>
            <Typography variant="h2">Hello MultiPages World</Typography>

            <div className={classes.row}>
                <Button onClick={() => go('/pokeapi')}>POKEAPI</Button>
                <Button onClick={() => go('/ethos')}>ETHOS JWT</Button>
                <Button onClick={() => goWithOptionalCardId('/serverless')}>ServerlessApi</Button>
            </div>
        </div>
    );
};

MultiPagesCard.propTypes = {
    classes: PropTypes.object.isRequired,
    cardControl: PropTypes.object
};

export default withStyles(styles)(MultiPagesCard);
