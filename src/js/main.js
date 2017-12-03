require('../styles/main.css');

import notification from './notification'
import {sum, del} from './math'


notification.welcome("Привет");
notification.bye("Пока");

sum(4,5);
del(5,3);