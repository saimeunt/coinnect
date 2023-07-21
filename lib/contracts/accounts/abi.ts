const abi = [
  {
    inputs: [],
    name: 'InvalidCreatorAccountError',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidUserAccountError',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotCreatorError',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotUserError',
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
    stateMutability: 'nonpayable',
    type: 'fallback',
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
            internalType: 'uint8[]',
            name: 'interests',
            type: 'uint8[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint8',
                    name: 'color',
                    type: 'uint8',
                  },
                  {
                    internalType: 'string',
                    name: 'logoUrl',
                    type: 'string',
                  },
                ],
                internalType: 'struct Accounts.CardTier',
                name: 'free',
                type: 'tuple',
              },
              {
                components: [
                  {
                    internalType: 'uint8',
                    name: 'color',
                    type: 'uint8',
                  },
                  {
                    internalType: 'string',
                    name: 'logoUrl',
                    type: 'string',
                  },
                ],
                internalType: 'struct Accounts.CardTier',
                name: 'standard',
                type: 'tuple',
              },
              {
                components: [
                  {
                    internalType: 'uint8',
                    name: 'color',
                    type: 'uint8',
                  },
                  {
                    internalType: 'string',
                    name: 'logoUrl',
                    type: 'string',
                  },
                ],
                internalType: 'struct Accounts.CardTier',
                name: 'premium',
                type: 'tuple',
              },
            ],
            internalType: 'struct Accounts.Cards',
            name: 'cards',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'oboleId',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'userId',
            type: 'bytes32',
          },
        ],
        internalType: 'struct Accounts.CreatorAccount',
        name: 'creatorAccount',
        type: 'tuple',
      },
    ],
    name: 'createCreatorAccount',
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
            name: 'username',
            type: 'bytes32',
          },
          {
            internalType: 'string',
            name: 'avatarUrl',
            type: 'string',
          },
          {
            internalType: 'uint8[]',
            name: 'interests',
            type: 'uint8[]',
          },
          {
            internalType: 'bytes32',
            name: 'userId',
            type: 'bytes32',
          },
        ],
        internalType: 'struct Accounts.UserAccount',
        name: 'userAccount',
        type: 'tuple',
      },
    ],
    name: 'createUserAccount',
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
    name: 'getCreatorAccountByName',
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
            internalType: 'uint8[]',
            name: 'interests',
            type: 'uint8[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint8',
                    name: 'color',
                    type: 'uint8',
                  },
                  {
                    internalType: 'string',
                    name: 'logoUrl',
                    type: 'string',
                  },
                ],
                internalType: 'struct Accounts.CardTier',
                name: 'free',
                type: 'tuple',
              },
              {
                components: [
                  {
                    internalType: 'uint8',
                    name: 'color',
                    type: 'uint8',
                  },
                  {
                    internalType: 'string',
                    name: 'logoUrl',
                    type: 'string',
                  },
                ],
                internalType: 'struct Accounts.CardTier',
                name: 'standard',
                type: 'tuple',
              },
              {
                components: [
                  {
                    internalType: 'uint8',
                    name: 'color',
                    type: 'uint8',
                  },
                  {
                    internalType: 'string',
                    name: 'logoUrl',
                    type: 'string',
                  },
                ],
                internalType: 'struct Accounts.CardTier',
                name: 'premium',
                type: 'tuple',
              },
            ],
            internalType: 'struct Accounts.Cards',
            name: 'cards',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'oboleId',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'userId',
            type: 'bytes32',
          },
        ],
        internalType: 'struct Accounts.CreatorAccount',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
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
    name: 'getCreatorAddressByName',
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
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getUserAccountByAddress',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'username',
            type: 'bytes32',
          },
          {
            internalType: 'string',
            name: 'avatarUrl',
            type: 'string',
          },
          {
            internalType: 'uint8[]',
            name: 'interests',
            type: 'uint8[]',
          },
          {
            internalType: 'bytes32',
            name: 'userId',
            type: 'bytes32',
          },
        ],
        internalType: 'struct Accounts.UserAccount',
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
        name: 'tokensAddress',
        type: 'address',
      },
    ],
    name: 'setTokens',
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
            internalType: 'uint8[]',
            name: 'interests',
            type: 'uint8[]',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'uint8',
                    name: 'color',
                    type: 'uint8',
                  },
                  {
                    internalType: 'string',
                    name: 'logoUrl',
                    type: 'string',
                  },
                ],
                internalType: 'struct Accounts.CardTier',
                name: 'free',
                type: 'tuple',
              },
              {
                components: [
                  {
                    internalType: 'uint8',
                    name: 'color',
                    type: 'uint8',
                  },
                  {
                    internalType: 'string',
                    name: 'logoUrl',
                    type: 'string',
                  },
                ],
                internalType: 'struct Accounts.CardTier',
                name: 'standard',
                type: 'tuple',
              },
              {
                components: [
                  {
                    internalType: 'uint8',
                    name: 'color',
                    type: 'uint8',
                  },
                  {
                    internalType: 'string',
                    name: 'logoUrl',
                    type: 'string',
                  },
                ],
                internalType: 'struct Accounts.CardTier',
                name: 'premium',
                type: 'tuple',
              },
            ],
            internalType: 'struct Accounts.Cards',
            name: 'cards',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'oboleId',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'userId',
            type: 'bytes32',
          },
        ],
        internalType: 'struct Accounts.CreatorAccount',
        name: 'creatorAccount',
        type: 'tuple',
      },
    ],
    name: 'updateCreatorAccount',
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
            name: 'username',
            type: 'bytes32',
          },
          {
            internalType: 'string',
            name: 'avatarUrl',
            type: 'string',
          },
          {
            internalType: 'uint8[]',
            name: 'interests',
            type: 'uint8[]',
          },
          {
            internalType: 'bytes32',
            name: 'userId',
            type: 'bytes32',
          },
        ],
        internalType: 'struct Accounts.UserAccount',
        name: 'userAccount',
        type: 'tuple',
      },
    ],
    name: 'updateUserAccount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export default abi;
