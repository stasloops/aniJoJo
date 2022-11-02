import { gql } from '@apollo/client'

export const REGISTRATION = gql`
    mutation registration($input: UserInput) {
        registration(input: $input) {
            user {
                id
                status
                username
            }, 
            tokens{
                accessToken
                refreshToken
            },
            errors {
                code
                message
            }
        }
    }
`

export const LOGIN = gql`
    mutation login($input: UserInput) {
        login(input: $input) {
            user {
                id
                status
                avatar {
                    lastModified
                    lastModifiedDate
                    name
                    size
                    type
                    webkitRelativePath
                }
                username
            }, 
            tokens{
                accessToken
                refreshToken
            },
            errors {
                code
                message
            }
        }
    }
`

export const REFRESH = gql`
    mutation refresh($input: TokensInput) {
        refresh(input: $input) {
            user {
                id
                status
                username
                avatar {
                    lastModified
                    lastModifiedDate
                    name
                    size
                    type
                    webkitRelativePath
                }
            }, 
            tokens{
                accessToken
                refreshToken
            },
            errors {
                code
                message
            }
        }
    }
`
export const LOGOUT = gql`
    mutation logout($input: TokensInput) {
        logout(input: $input) {
            user {
                id
                status
                username
            }, 
            tokens{
                accessToken
                refreshToken
            },
            errors {
                code
                message
            }
        }
    }
`

export const UPDATE = gql`
    mutation update($input: UpdateInput) {
        update(input: $input) {
            user {
                id
                status
                username
            }, 
            tokens{
                accessToken
                refreshToken
            },
            errors {
                code
                message
            }
        }
    }
`