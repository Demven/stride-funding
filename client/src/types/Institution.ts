export default interface Institution {
  id: string;
  institutionId: string;
  institutionType: string;
  name: string;
  city: string;
  state: string;
  zip: string;
  cipCode: string;
  cipName: string;
  credentialLevel: string;
  annualRate: number;
  annualRateNumerator: number;
  annualRateDenominator: number;
  incomeRate: number;
  incomeRateNumerator: number;
  incomeRateDenominator: number;
  transitionalRate: number;
  transitionalRateNumerator: number;
  transitionalRateDenominator: number;
  transitionalDiscretionaryRate: number;
  transitionalDiscretionaryRateNumerator: number;
  transitionalDiscretionaryRateDenominator: number;
  ssaMeanEarnings: number;
  ssaMedianEarnings: number;
}
