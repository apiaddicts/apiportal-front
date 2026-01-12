import React, { useState } from 'react';
import 'yup-phone';
import * as Yup from 'yup'; // 👈 ESTA LÍNEA ES LA CLAVE
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import classes from './support.module.scss';
import Button from '../Buttons/Button';
import InputUI from '../Input/InputUI/InputUI';
import TextAreaUI from '../Input/InputUI/TextAreaUI';

function Support({ isPrivate }) {
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            sendMailTerms: false,
        },
        validateOnChange: true,
        validationSchema: Yup.object({
            name: Yup.string().required(t('Support.requiredField')).matches(/^[a-zA-ZÀ-ÿ\s]+$/, t('Support.noSpecialCharacters')).max(50, t('Support.maxCharacters')),
            lastname: Yup.string().required(t('Support.requiredField')).matches(/^[a-zA-ZÀ-ÿ\s]+$/, t('Support.noSpecialCharacters')).max(50, t('Support.maxCharacters')),
            email: Yup.string().email(t('Support.invalidEmail')).required(t('Support.requiredField')),
            subject: Yup.string().required(t('Support.requiredField')).matches(/^[a-zA-ZÀ-ÿ\s]+$/, t('Support.noSpecialCharacters')).max(70, t('Support.maxCharacters')),
            message: Yup.string().required(t('Support.requiredField')).max(500, t('Support.maxCharacters')),
        }),
        onSubmit: async (values) => {
            if (!executeRecaptcha) {
                console.warn('Recaptcha not yet available');
                return;
            }

            const recaptchaToken = await executeRecaptcha('contact_form');
            if (!recaptchaToken) return;

            const dataWithToken = {
                ...values,
                recaptchaToken,
            };

            setDisplaySubmit(false);
            dispatch(emailAction.sendContactEmail(dataWithToken));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} noValidate>
            <div className={classes.contactForm}>
                <div className={classes.rowGroup}>
                    <div className={classes.inputHalf}>
                        <InputUI
                            name="name"
                            id="name"
                            type="text"
                            label={t('Support.name')}
                            className={classes.inputField}
                        />
                    </div>
                    <div className={classes.inputHalf}>
                        <InputUI
                            name="lastname"
                            id="lastname"
                            type="text"
                            label={t('Support.lastname')}
                            className={classes.inputField}
                        />
                    </div>
                </div>

                <div className={classes.rowGroup}>
                    <div className={classes.inputHalf}>
                        <InputUI
                            name="email"
                            id="email"
                            type="email"
                            label={t('Support.email')}
                            className={classes.inputField}
                        />
                    </div>
                    <div className={classes.inputHalf}>
                        <InputUI
                            name="phone"
                            id="phone"
                            type="tel"
                            label={t('Support.phone')}
                            className={classes.inputField}
                        />
                    </div>
                </div>

                <div className={classes.rowGroup}>
                    <div className={classes.inputFull}>
                        <InputUI
                            name="subject"
                            id="subject"
                            type="text"
                            label={t('Support.subject')}
                            className={classes.inputField}
                        />
                    </div>
                </div>

                <div className={classes.rowGroup}>
                    <div className={classes.inputFull}>
                        <TextAreaUI
                            name="message"
                            id="message"
                            label={t('Support.message')}
                            className={classes.textAreaField}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className={classes.submitButton}
                    disabled={!formik.isValid}
                >
                    {t('Support.send')}
                </button>
            </div>

        </form>
    );
}

export default Support;