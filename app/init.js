require('app/stylus/main.styl');

import mobileUtils from  'app/utils/mobile';

if (mobileUtils.isMobile()){
    document.body.classList.add('mobile');
}

