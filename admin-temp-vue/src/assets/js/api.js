import {post, get} from './http'

export const verify= data=> post({url: 'http://cm-checkAuditing.cmcm.com/wallet/verify', data}); 