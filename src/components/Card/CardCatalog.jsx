import React, { useEffect, useState, useCallback } from 'react';
import './cards.scss';
import { useTranslation } from 'react-i18next';

function CatalogCard({
  id,
  title,
  subtitle,
  provider,
  tags = [],
  imageUrl,
  selectionColor = "#10B3B7",
  selected,
  defaultSelected = false,
  disabled = false,
  onSelectChange
}) {
  const { t } = useTranslation();
  const isControlled = typeof selected === "boolean";
  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const isSelected = isControlled ? selected : internalSelected;

  const handleToggle = useCallback(() => {
    if (disabled) return;
    const next = !isSelected;
    if (!isControlled) setInternalSelected(next);
    onSelectChange?.(id, next);
  }, [disabled, id, isControlled, isSelected, onSelectChange]);

  const onKeyDown = e => {
    if (disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <article
      className={`catalog-card ${selected ? "catalog-card__is-selected" : ""}`}
      role="button"
      aria-pressed={isSelected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleToggle}
      onKeyDown={onKeyDown}
    >
      <div className='catalog-card__media'>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            aria-hidden="true"
            className='catalog-card__img'
          />
        ) : (
          <div className='catalog-card__icon' aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <circle cx="12" cy="12" r="11" className='icon-bg' />
              <path
                d="M7 12.5l3.2 3.2L17 8.9"
                fill="none"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className='icon-check'
              />
            </svg>
          </div>
        )}

        <div className='catalog-card__badge' aria-hidden="true">
          <svg viewBox="0 0 20 20" focusable="false">
            <rect x="1" y="1" width="18" height="18" rx="4" className='badge-box' />
            <path d="M5.5 10.4l2.7 2.7L14.7 7" className='badge-check' />
          </svg>
        </div>
      </div>

      <div className='catalog-card__body'>
        <h3 className='catalog-card__title'>{title}</h3>
        {subtitle && <p className='catalog-card__subtitle'>{subtitle}</p>}
        {provider && <p className='catalog-card__provider'>{t("Catalogs.providedBy")} {provider}</p>}

        {!!tags.length && (
          <div className='catalog-card__tags'>
            {tags.map((t) => (
              <span key={t} className='catalog-card__tag'>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export {
  CatalogCard
}