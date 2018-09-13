import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class ChaturbateChat extends PolymerElement {
  static get template() {
    return html `   
     <style>
  :host {
    --cb-host-color: #DC5500;
    --cb-moderator-color: #DC0000;
    --cb-fanclub-color: #090;
    --cb-tipped-tons-color: #804baa;
    --cb-tipped-alot-color: #be6aff;
    --cb-tipped-color: #009;
    --cb-has-tokens-color: #69A;
    --cb-default-color: #999;
    --cb-default-background-color: rgba(0,0,0,0.5);
    --cb-chat-color: #fff;
    --cb-chat-text-shadow-color: rgba(0, 0, 0, 0.65);
  }

  .chat-container {
    text-shadow: -1px 0 var(--cb-chat-text-shadow-color),
                 0 1px var(--cb-chat-text-shadow-color),
                 1px 0 var(--cb-chat-text-shadow-color),
                 0 -1px var(--cb-chat-text-shadow-color);
    display: flex;
    flex-direction: column;
    @apply --cb-chat-container-mixin;
  }

  .chat-row {
    background-color: var(--cb-default-background-color);
    display: inline-table;
    padding: 8px;
    border-radius: 4px;
    margin: 4px;
    @apply --cb-chat-row-mixin;
  }

  .type-message {
    @apply --cb-chat-message-mixin;
  }

  .type-message .username {
    @apply --cb-chat-message-username-mixin;
  }

  .type-message .delim {
    @apply --cb-chat-message-delim-mixin;
  }

  .type-message .content {
    @apply --cb-chat-message-content-mixin;
  }

  .type-entry {
    @apply --cb-chat-entry-mixin;
  }

  .type-entry .username {
    @apply --cb-chat-entry-username-mixin;
  }

  .type-entry .content {
    @apply --cb-chat-entry-content-mixin;
  }

  .type-leave {
    @apply --cb-chat-leave-mixin;
  }

  .type-leave .username {
    @apply --cb-chat-leave-username-mixin;
  }

  .type-leave .content {
    @apply --cb-chat-leave-content-mixin;
  }

  .delim {
    margin: 0 0 0 4px;
    color: var(--cb-chat-color);
    @apply --cb-chat-delim-mixin;
  }

  .username {
    font-weight: bold;
    color: var(--cb-default-color);
    @apply --cb-chat-username-mixin;
  }

  .user-host .username {
    color: var(--cb-host-color);
    @apply --cb-chat-username-host-mixin;
  }

  .user-moderator .username {
    color: var(--cb-moderator-color);
    @apply --cb-chat-username-moderator-mixin;
  }

  .user-fanclub .username {
    color: var(--cb-fanclub-color);
    @apply --cb-chat-username-fanclub-mixin;
  }

  .user-tipped-tons .username {
    color: var(--cb-tipped-tons-color);
    @apply --cb-chat-username-tipped-tons-mixin;
  }

  .user-tipped-alot .username {
    color: var(--cb-tipped-alot-color);
    @apply --cb-chat-username-tipped-alot-mixin;
  }

  .user-tipped .username {
    color: var(--cb-tipped-color);
    @apply --cb-chat-username-tipped-mixin;
  }

  .user-has-tokens .username {
    color: var(--cb-has-tokens-color);
    @apply --cb-chat-username-has-tokens-mixin;
  }

  .content {
    margin: 0 0 0 8px;
    color: var(--cb-chat-color);
    @apply --cb-chat-content-mixin;
  }

  .user-host .content {
    @apply --cb-chat-content-host-mixin;
  }

  .user-moderator .content {
    @apply --cb-chat-content-moderator-mixin;
  }

  .user-fanclub .content {
    @apply --cb-chat-content-fanclub-mixin;
  }

  .user-tipped-tons .content {
    @apply --cb-chat-content-tipped-tons-mixin;
  }

  .user-tipped-alot .content {
    @apply --cb-chat-content-tipped-alot-mixin;
  }

  .user-tipped .content {
    @apply --cb-chat-content-tipped-mixin;
  }

  .user-has-tokens .content {
    @apply --cb-chat-content-has-tokens-mixin;
  }
</style>

<div class="chat-container">
  <template is="dom-repeat" items="{{items}}">
    <div class$="chat-row [[_getItemClass(item)]] [[_getUserTypeClass(item)]] [[_getUserGenderClass(item)]]">
      <span class="username">
        [[item.details.user.username]]
      </span>
      <template is="dom-if" if="[[_isMessage(item)]]" restamp="true">
        <span class="delim">
          [[delim]]
        </span>
      </template>
      <span class="content">
        [[_getMessageContent(item)]]
      </span>
    </div>
  </template>
</div>`;
  }

  static get properties() {
    return {
      items: {
        type: Array,
        value: []
      },
      delim: {
        type: String,
        value: ':',
        reflectToAttribute: true
      },
      entryMessage: {
        type: String,
        value: 'has joined the room',
        reflectToAttribute: true
      },
      leaveMessage: {
        type: String,
        value: 'has left the room',
        reflectToAttribute: true
      }
    }
  }

  _getMessageContent(item) {
    if (this._isMessage(item)) return item.details.message;
    if (this._isEntry(item)) return this.entryMessage;
    if (this._isLeave(item)) return this.leaveMessage;
  }

  _getUserGenderClass(item) {
    if (item.details.user.gender == 'm') return 'user-male';
    if (item.details.user.gender == 'f') return 'user-female';
    if (item.details.user.gender == 't') return 'user-trans';
    if (item.details.user.gender == 'c') return 'user-couple';
  }

  _getUserTypeClass(item) {
    if (item.details.user.isHost) return 'user-host';
    if (item.details.user.isMod) return 'user-moderator';
    if (item.details.user.inFanclub) return 'user-fanclub';
    if (item.details.user.tippedTonsRecently) return 'user-tipped-tons';
    if (item.details.user.tippedAlotRecently) return 'user-tipped-alot';
    if (item.details.user.tippedRecently) return 'user-tipped';
    if (item.details.user.hasTokens) return 'user-has-tokens';
  }

  _getItemClass(item) {
    if (this._isMessage(item)) return 'type-message';
    if (this._isEntry(item)) return 'type-entry';
    if (this._isLeave(item)) return 'type-leave';
  }

  _isMessage(item) {
    return item.type == 'MESSAGE';
  }

  _isEntry(item) {
    return item.type == 'ENTRY';
  }

  _isLeave(item) {
    return item.type == 'LEAVE';
  }
}


customElements.define('chaturbate-chat', ChaturbateChat);
