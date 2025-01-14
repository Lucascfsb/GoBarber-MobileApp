import React, {ReactNode} from "react";

import { AuthProvider } from "./auth";

const AppProvider: React.FC<{children: ReactNode}> = ({children}) => (
  <AuthProvider>
      {children}
  </AuthProvider>
)

export default AppProvider
