export const abi = [
  {
    inputs: [],
    name: 'NotCreatorError',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'name',
            type: 'bytes32',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'avatarUrl',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'bannerUrl',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'interests',
            type: 'uint256',
          },
        ],
        internalType: 'struct Memberships.Membership',
        name: 'membership',
        type: 'tuple',
      },
    ],
    name: 'createMembership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'name',
        type: 'bytes32',
      },
    ],
    name: 'getMembershipByName',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'name',
            type: 'bytes32',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'avatarUrl',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'bannerUrl',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'interests',
            type: 'uint256',
          },
        ],
        internalType: 'struct Memberships.Membership',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'name',
            type: 'bytes32',
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'avatarUrl',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'bannerUrl',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'interests',
            type: 'uint256',
          },
        ],
        internalType: 'struct Memberships.Membership',
        name: 'membership',
        type: 'tuple',
      },
    ],
    name: 'updateMembership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
