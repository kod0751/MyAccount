/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, ComponentType, ReactNode } from 'react'

function withSusepense<Props = Record<string, never>>(
  WrappedComponent: ComponentType<Props>,
  options: {
    fallback: ReactNode
  },
) {
  return function SuspendedComponent(props: Props) {
    return (
      <Suspense fallback={options.fallback}>
        <WrappedComponent {...(props as any)} />
      </Suspense>
    )
  }
}
export default withSusepense
