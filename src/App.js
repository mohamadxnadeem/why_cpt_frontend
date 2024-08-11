import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import routes from './pages/index';
import ReactGA from "react-ga4";
import { injectSpeedInsights } from '@vercel/speed-insights';

function App() {
    const TRACKING_ID = 'G-LCC52EM33V'; // Tracking ID

    useEffect(() => {
        // Facebook Pixel code
        /* eslint-disable */
        !function (f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function () {
                n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        }(window, document, 'script',
            'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '248592564466475');
        fbq('track', 'PageView');
        /* eslint-enable */

        // Initialize Google Analytics
        ReactGA.initialize(TRACKING_ID);
    }, []);

    // Use injectSpeedInsights here
    useEffect(() => {
        injectSpeedInsights();
    }, []);

    return (
        <Routes>
            {routes.map((data, index) => (
                <Route onUpdate={() => window.scrollTo(0, 0)} exact={true} path={data.path} element={data.component} key={index} />
            ))}
        </Routes>
    );
}

export default App;
