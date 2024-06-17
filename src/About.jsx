import React from 'react';

const AboutUs = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-900">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white">TLE Profiles</h1>
                <p className="text-lg text-yellow-600 mt-4">All Your Coding Profiles in One Place</p>
            </header>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-yellow-600 mb-4">About Us</h2>
                <p className="text-white leading-relaxed mb-4">
                    Welcome to TLE Profiles, your one-stop solution for managing and showcasing all your coding profiles. Our platform consolidates your coding activities from various sites and provides a comprehensive overview of your coding journey. Whether you're a competitive programmer, a developer, or a learner, TLE Profiles helps you keep track of your progress and achievements in one place.
                </p>
                <p className="text-white leading-relaxed">
                    Our mission is to simplify the way you manage your coding profiles. We understand the challenges of maintaining multiple profiles across different platforms. TLE Profiles aims to bring all your coding accomplishments under one roof, making it easier for you to share your skills with the world.
                </p>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-yellow-600 mb-4">Features</h2>
                <ul className="list-disc list-inside text-white">
                    <li className="mb-2">Aggregate coding profiles from multiple platforms</li>
                    <li className="mb-2">Track your progress and achievements over time</li>
                    <li className="mb-2">Compare your performance with peers</li>
                    <li className="mb-2">Receive insights and analytics on your coding activities</li>
                    <li className="mb-2">Showcase your skills and projects in a unified profile</li>
                </ul>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-yellow-600 mb-4">Our Vision</h2>
                <p className="text-white leading-relaxed mb-4">
                    At TLE Profiles, we envision a future where managing multiple coding profiles is a thing of the past. We strive to create a seamless experience for coders worldwide, enabling them to focus on what they do best - coding. Our platform aims to be the leading solution for developers to track, manage, and showcase their coding journey.
                </p>
                <p className="text-white leading-relaxed">
                    We are committed to continuous improvement and innovation. We believe in the power of community and the importance of collaboration. TLE Profiles is not just a tool; it's a community where coders can connect, share knowledge, and grow together.
                </p>
            </section>
            <section>
                <h2 className="text-2xl font-semibold text-yellow-600 mb-4">Contact Us</h2>
                <p className="text-white leading-relaxed">
                    Have questions or feedback? We'd love to hear from you! Reach out to us at <a href="mailto:viveksingh27795@gmail.com" className="text-yellow-600 hover:underline"> viveksingh27795@gmail.com</a> or follow us on our social media channels. Join us in making coding profile management simpler and more efficient.
                </p>
            </section>
        </div>
    );
};

export default AboutUs;
