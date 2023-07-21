import { equalWithStack } from './equalWithStack';

export function equal(lhs: any, rhs: any): boolean {
  return equalWithStack(lhs, rhs, []);
}

export function equalWithoutCycle(lhs: any, rhs: any): boolean {
  return equalWithStack(lhs, rhs, false);
}


export function isdiff(lhs: any, rhs: any): boolean {
  return !equalWithStack(lhs, rhs, []);
}

export function isdiffWithoutCycle(lhs: any, rhs: any): boolean {
  return !equalWithStack(lhs, rhs, false);
}
