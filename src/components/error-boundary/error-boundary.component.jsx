import React from 'react';
import { Component } from 'react';
import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './error-boundary.styles';

export default class ErrorBoundary extends Component {
    state = { hasError: false };

    componentDidCatch(error, info) {
        console.log(error);
        console.log(info);
    }

    static getDerivedStateFromError(error) {
        // handle the error

        return {
            hasError: true,
        };
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl="https://i.imgur.com/A040Lxr.png" />
                    <ErrorImageText>
                        You thought this mission to the moon would be a quick six month thing. Your neighbor offered to
                        look after your dog. Your high school math teacher was impressed. He once said you wouldn’t
                        amount to anything.You sure showed him. But now here you are, fifty feet from your spaceship
                        with no way to get back. Your dog will be so sad. Your math teacher will be so smug. Pretty
                        devastating.
                    </ErrorImageText>
                </ErrorImageOverlay>
            );
        }
        return this.props.children;
    }
}
