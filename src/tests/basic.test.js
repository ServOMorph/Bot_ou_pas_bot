import { describe, it, expect } from 'vitest';
import { mockPlayers, mockMatches } from './fixtures';

describe('Vérification du setup de test', () => {
  it('devrait charger les fixtures correctement', () => {
    expect(mockPlayers.human.display_name).toBe('Player One');
    expect(mockPlayers.bot.is_bot).toBe(true);
  });

  it('devrait avoir des matchs simulés', () => {
    expect(mockMatches.length).toBeGreaterThan(0);
    expect(mockMatches[0].status).toBe('waiting');
  });
});

describe('Environnement JSDOM', () => {
  it('devrait avoir accès au document', () => {
    const div = document.createElement('div');
    div.innerHTML = '<h1>Hello Vitest</h1>';
    expect(div.querySelector('h1').textContent).toBe('Hello Vitest');
  });
});
