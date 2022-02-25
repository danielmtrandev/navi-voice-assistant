import React from 'react' ;

// Components that will make app mobile friendly/responsive, affects text display, animations / material-ui is a react ui framework
import { Grid, Grow, Typography } from '@material-ui/core';

import useStyles from './styles.js'
import NewsCard from '../NewsCard/NewsCard';


const infoCards = [
    { color: '#22272c', title: 'Hear Latest News', info: 'CNN, Washington Post, BBC News',  text: 'Give me the latest news' },
    { color: '#22272c', title: 'Utilize Different Tools ', info: 'Weather Checker, Simple Calculator, Calendar Checker', text: 'What\'s the weather in Boston?' },
    { color: '#22272c', title: 'Check out Crypto', info: 'Bitcoin General Info.', text: 'What\'s the current price of Bitcoin?' },
    { color: '#22272c', title: 'Have a Chat', info: 'Navi would love to to tell you about itself', text: 'How are you?' },
];



const NewsCards = ({ articles, activeArticle }) => {
    const classes = useStyles();

    if(!articles.length){
        return (
            <Grow in>
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {infoCards.map((infoCard) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
                            <div className={classes.card} style={{ backgroundColor: infoCard.color }}>
                                <Typography variant="h5">{infoCard.title}</Typography>
                                {  infoCard.info ? (<Typography variant="h6"><strong>{infoCard.title.split(' ')[2]}:</strong><br />{infoCard.info}</Typography>) : null }
                                <Typography variant="h6">Try saying: <br /> <i>{infoCard.text}</i></Typography>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Grow>
        );
    }

    return (
        // Grow: if true, show the component; triggers the enter or exit animation
        // Grid: wraps all of our grid items 
        <Grow in>
            <Grid className={classes.container} container alignItems="stretch" spacing={3}> 
                {articles.map((article, i) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
                        <NewsCard article={article} activeArticle={activeArticle} i={i} />
                    </Grid>
                ))}
            </Grid>
        </Grow>

    );
}

export default NewsCards;