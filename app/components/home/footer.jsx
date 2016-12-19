import React,{
    PropTypes,
} from 'react';

const styles = require('./home.styl');

export default () => (
    <div className={styles.footer}>
        <span>Made with ♥ in Melbourne.</span>
        <span>© 2016 Broccoli & Co. All rights reserved.</span>
    </div>
);
