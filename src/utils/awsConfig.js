import Amplify, { Auth } from "aws-amplify"

import { aws_exports } from "../aws-exports"

Amplify.configure(aws_exports)
Auth.configure(aws_exports)
