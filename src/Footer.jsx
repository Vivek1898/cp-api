import React from 'react';

const Footer = () => {
    return (
        <div className=" w-full bg-gray-900 text-white py-6 mt-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-semibold">About TLE Profiles</h3>
                        <p className="text-yellow-600 mt-2 text-sm max-w-xs">
                            TLE Profiles consolidates all your coding profiles in one place. Track your progress, compare with peers, and showcase your skills.
                        </p>
                    </div>
                    <div className="flex space-x-4 mb-4 md:mb-0">
                        <a
                            title="Give a star"
                            href="https://github.com/vivek1898/cp-api"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-10 h-10 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
                        >
                            <img
                                className="object-cover object-center w-full h-full rounded-full"
                                src="https://w7.pngwing.com/pngs/857/611/png-transparent-github-git-hub-logo-icon-thumbnail.png"
                                alt="GitHub"
                            />
                        </a>
                        <a
                            title="Follow on LinkedIn"
                            href="https://www.linkedin.com/in/vivek-s-953368121/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-10 h-10 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
                        >
                            <img
                                className="object-cover object-center w-full h-full rounded-full"
                                src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                                alt="LinkedIn"
                            />
                        </a>
                    </div>
                    <div className="text-sm">
                        <p>Contact us: <a href="mailto:viveksingh27795@gmail.com" className="text-yellow-600"> viveksingh27795@gmail.com</a></p>
                        <p>Follow us on social media for updates and news.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
