// overall config to run the app

// useEffect is a function that happens once the code starts / when the app mounts
import React, { useState, useEffect } from 'react';
// adding alan into app
import alanBtn from '@alan-ai/alan-sdk-web';

// required to mitigate certain voice to text issues that occur when requiring numbers
// User: Open article 4 
// Alan: 
import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';

const alanKey = '1f4a2871d90c066bd662c1fc37feb3802e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        // generates an Alan button on the browser
        alanBtn({
            key: alanKey,
            // how Alan can listen to specific commands
            onCommand: ({ command, articles, number }) => {
                if(command === 'newHeadlines'){
                   setNewsArticles(articles);
                   setActiveArticle(-1);
                } else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1); 
                } else if(command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];
                    if(parsedNumber > 20){
                        alanBtn().playText('Please try that again.')
                    } else if(article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening ... ');
                    }
                }
            }
        })
    }, [])
    
    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="cover.png" className={classes.alanLogo} alt="alan logo" />
            </div>

            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    );
}

export default App;

