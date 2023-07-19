import { isdiffWithStack } from './isdiffWithStack';

export function isdiff(lhs: any, rhs: any): boolean {
  return isdiffWithStack(lhs, rhs, []);
}
