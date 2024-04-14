import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';
import { IntlProvider } from 'react-intl';
import localeEsMessages from "../../locales/es";
const message = localeEsMessages;

describe('Footer', () => {
    it('renders without crashing', () => {
        render(
            <IntlProvider locale="es" messages={message}>
                <Footer />
            </IntlProvider>
        );
        const text = screen.getByText('Proyecto Desarrollo Web')
        expect(text).toBeInTheDocument();

    });

    it('renders navigation link', () => {
        render(
            <IntlProvider locale="es" messages={message}>
                <Footer />
            </IntlProvider>
        );
        const homeLinkElement = screen.getByRole('link', { name: 'NVICTUM', hidden: true});

        expect(homeLinkElement).toBeInTheDocument();

    });
});
