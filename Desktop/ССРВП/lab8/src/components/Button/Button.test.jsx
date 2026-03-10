import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('рендерит текст кнопки', () => {
    render(<Button>Нажми меня</Button>);
    expect(screen.getByRole('button', { name: 'Нажми меня' })).toBeInTheDocument();
  });

  it('применяет класс primary по умолчанию (CSS Module)', () => {
    render(<Button>OK</Button>);
    // CSS Modules хэшируют имена классов: _primary_xxxxx
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/primary/);
  });

  it('применяет класс secondary при variant="secondary"', () => {
    render(<Button variant="secondary">Отмена</Button>);
    expect(screen.getByRole('button').className).toMatch(/secondary/);
  });

  it('применяет класс danger при variant="danger"', () => {
    render(<Button variant="danger">Удалить</Button>);
    expect(screen.getByRole('button').className).toMatch(/danger/);
  });

  it('содержит базовый класс btn', () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole('button').className).toMatch(/btn/);
  });

  it('вызывает onClick при клике', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Клик</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('не вызывает onClick когда disabled=true', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Заблокировано</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('рендерит кнопку с атрибутом disabled', () => {
    render(<Button disabled>Недоступно</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
