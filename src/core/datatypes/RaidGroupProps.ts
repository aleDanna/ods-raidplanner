export interface RaidGroupProps {
  id?: number;
  name?: string;
  rank?: number;
  imageName?: string;
}

export const EmptyRaidGroup = {
  id: -1,
  name: '---',
  rank: 0,
  imageName: ''
};
