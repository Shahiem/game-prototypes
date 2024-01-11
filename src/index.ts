import Application from './engine/core/Application';
import * as PIXI from 'pixi.js';
import './scss/main.scss';

if (process.env.NODE_ENV === 'development') window.PIXI = PIXI;

PIXI.utils.skipHello();
document.addEventListener('DOMContentLoaded', () => new Application());