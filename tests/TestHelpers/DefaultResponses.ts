import * as fs from "fs";
import * as path from "path";
import apiInstallationRegistration from "../TestData/api-installation";
import apiDeviceRegistration from "../TestData/api-installation";
import apiSessionRegistration from "../TestData/api-session-registration";
import oauthAuthorizationResponse from "../TestData/oauth-authorization";

export const defaultResponse = async moxios => {
    await new Promise((resolve, reject) => {
        moxios.wait(() => {
            moxios.requests
                .mostRecent()
                .respondWith({
                    status: 200,
                    response: {
                        Response: [
                            {
                                UserCredentialPasswordIpRequest: {},
                                ServerPublicKey: {
                                    server_public_key: ""
                                },
                                ApiKey: {
                                    api_key: "key"
                                },
                                payments: [],
                                Id: {
                                    id: ""
                                },
                                Payment: {},
                                UserCompany: {},
                                UserLight: {},
                                UserPerson: {}
                            },
                            {
                                Token: {
                                    token: ""
                                }
                            },
                            {
                                ServerPublicKey: {
                                    id: ""
                                }
                            }
                        ]
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(resolve)
                .catch(reject);
        });
    });
};

export const installationRegistration = async moxios => {
    await new Promise((resolve, reject) => {
        moxios.wait(() => {
            moxios.requests
                .mostRecent()
                .respondWith(apiInstallationRegistration())
                .then(resolve)
                .catch(reject);
        });
    });
};

export const deviceServerRegistration = async moxios => {
    await new Promise((resolve, reject) => {
        moxios.wait(() => {
            moxios.requests
                .mostRecent()
                .respondWith(apiDeviceRegistration())
                .then(resolve)
                .catch(reject);
        });
    });
};

export const sessionRegistration = async moxios => {
    await new Promise((resolve, reject) => {
        moxios.wait(() => {
            moxios.requests
                .mostRecent()
                .respondWith(apiSessionRegistration())
                .then(resolve)
                .catch(reject);
        });
    });
};

export const oauthUserAuthorization = async moxios => {
    await new Promise((resolve, reject) => {
        moxios.wait(() => {
            moxios.requests
                .mostRecent()
                .respondWith(oauthAuthorizationResponse())
                .then(resolve)
                .catch(reject);
        });
    });
};

export const fileResponse = async moxios => {
    await new Promise((resolve, reject) => {
        const stream = fs.readFileSync(path.join(__dirname, "../TestData/bunq.png"));

        moxios.wait(() => {
            moxios.requests
                .mostRecent()
                // return a file
                .respondWith({
                    status: 200,
                    response: stream
                })
                .then(resolve)
                .catch(reject);
        });
    });
};
