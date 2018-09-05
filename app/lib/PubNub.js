import ChatEngineCore from 'chat-engine';

import { PUBNUB_PUB_KEY, PUBNUB_SUB_KEY } from 'react-native-dotenv';

// setup up PubNub API keys
export const ChatEngine = ChatEngineCore.create({
  publishKey: PUBNUB_PUB_KEY,
  subscribeKey: PUBNUB_SUB_KEY,
});
