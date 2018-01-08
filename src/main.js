require('./styles/main.css');

import notification from './js/notification';
import {sum, del} from './js/math';


notification.welcome("Привет");
notification.bye("Пока");

sum(4,5);
sum(5,5);
del(5,3);