export type Caboz = {
    "version": "0.1.0",
    "name": "caboz",
    "constants": [
        {
            "name": "MINT_LIST_AUTHORITY",
            "type": "publicKey",
            "value": "pubkey ! (\"2cJ9pLhz8cvqVi5eaiPLZS5WWDMzD18PhJ9uc4NRQ6PG\")"
        },
        {
            "name": "FEE_RECEIVER",
            "type": "publicKey",
            "value": "pubkey ! (\"GYFSYhaagL1Z9njJbAUj4uvrU2uvPPL6vJJhn7MqL55y\")"
        },
        {
            "name": "INKWORK_COLLECTION_MINT",
            "type": "publicKey",
            "value": "pubkey ! (\"FdkitqFFz7U65o3v7kjQ6neNGz3DwdQ36pqCELcsMG9s\")"
        }
    ],
    "instructions": [
        {
            "name": "allowPaymentMint",
            "docs": [
                "whitelist mint to allow orders in it"
            ],
            "accounts": [
                {
                    "name": "mintListAuthority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "paymentMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "allowedPaymentMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "feeMultiplierBps",
                    "type": "u16"
                }
            ]
        },
        {
            "name": "disallowPaymentMint",
            "docs": [
                "remove payment mint from whitelist,",
                "can be used in combination with `allow_payment_mint` to change fee multiplier"
            ],
            "accounts": [
                {
                    "name": "mintListAuthority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "allowedPaymentMint",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "createOrder",
            "docs": [
                "create an order, passing up to 10 buyer's Inkwork NFT",
                "pairs of (TokenAccount, Metadata) in remaining_accounts"
            ],
            "accounts": [
                {
                    "name": "buyer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "order",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "allowedPaymentMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "price",
                    "type": "u64"
                },
                {
                    "name": "collectionMint",
                    "type": "publicKey"
                },
                {
                    "name": "nftSet",
                    "type": {
                        "defined": "MerkleTree"
                    }
                }
            ]
        },
        {
            "name": "acceptOrderNative",
            "docs": [
                "sell NFT for SOL"
            ],
            "accounts": [
                {
                    "name": "buyer",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "buyerWallet",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "buyerNftTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "order",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "nftMetadata",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "seller",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "sellerNftTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeReceiver",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "expectedPrice",
                    "type": "u64"
                },
                {
                    "name": "proof",
                    "type": {
                        "vec": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    }
                }
            ]
        },
        {
            "name": "acceptOrderNonNative",
            "docs": [
                "sell NFT for an SPL token"
            ],
            "accounts": [
                {
                    "name": "acceptOrder",
                    "accounts": [
                        {
                            "name": "buyer",
                            "isMut": false,
                            "isSigner": false
                        },
                        {
                            "name": "buyerWallet",
                            "isMut": true,
                            "isSigner": false
                        },
                        {
                            "name": "buyerNftTokenAccount",
                            "isMut": true,
                            "isSigner": false
                        },
                        {
                            "name": "order",
                            "isMut": true,
                            "isSigner": false
                        },
                        {
                            "name": "nftMetadata",
                            "isMut": false,
                            "isSigner": false
                        },
                        {
                            "name": "seller",
                            "isMut": true,
                            "isSigner": true
                        },
                        {
                            "name": "sellerNftTokenAccount",
                            "isMut": true,
                            "isSigner": false
                        },
                        {
                            "name": "feeReceiver",
                            "isMut": true,
                            "isSigner": false
                        },
                        {
                            "name": "tokenProgram",
                            "isMut": false,
                            "isSigner": false
                        },
                        {
                            "name": "systemProgram",
                            "isMut": false,
                            "isSigner": false
                        }
                    ]
                },
                {
                    "name": "buyerWalletTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "sellerTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeReceiverTokenAccount",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "expectedPrice",
                    "type": "u64"
                },
                {
                    "name": "proof",
                    "type": {
                        "vec": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    }
                }
            ]
        },
        {
            "name": "closeOrder",
            "docs": [
                "make order unavailable for trading"
            ],
            "accounts": [
                {
                    "name": "buyer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "order",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "createWallet",
            "docs": [
                "create a virtual wallet to then deposit tokens into it"
            ],
            "accounts": [
                {
                    "name": "buyer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "buyerWallet",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "withdrawNative",
            "docs": [
                "withdraw SOL from a wallet"
            ],
            "accounts": [
                {
                    "name": "buyer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "buyerWallet",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "lamports",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "withdrawNonNative",
            "docs": [
                "withdraw SPL tokens from wallet's token account"
            ],
            "accounts": [
                {
                    "name": "withdraw",
                    "accounts": [
                        {
                            "name": "buyer",
                            "isMut": true,
                            "isSigner": true
                        },
                        {
                            "name": "buyerWallet",
                            "isMut": true,
                            "isSigner": false
                        }
                    ]
                },
                {
                    "name": "buyerWalletTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "destination",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "Order",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "buyer",
                        "type": "publicKey"
                    },
                    {
                        "name": "completionReceipt",
                        "docs": [
                            "zeroed if order is open"
                        ],
                        "type": {
                            "defined": "CompletionReceipt"
                        }
                    },
                    {
                        "name": "paymentMint",
                        "type": "publicKey"
                    },
                    {
                        "name": "price",
                        "type": "u64"
                    },
                    {
                        "name": "buyerInkworkNftCount",
                        "docs": [
                            "amount of buyer's Inkwork NFTs at the moment of order creation.",
                            "may be used to prioritize holders"
                        ],
                        "type": "u8"
                    },
                    {
                        "name": "fee",
                        "type": "u64"
                    },
                    {
                        "name": "collectionMint",
                        "docs": [
                            "address of desired collection mint.",
                            "zeroed if none"
                        ],
                        "type": "publicKey"
                    },
                    {
                        "name": "nftSet",
                        "docs": [
                            "the set of wanted NFTs.",
                            "zeroed if none"
                        ],
                        "type": {
                            "defined": "MerkleTree"
                        }
                    },
                    {
                        "name": "creationTs",
                        "docs": [
                            "creation timestamp"
                        ],
                        "type": "i64"
                    }
                ]
            }
        },
        {
            "name": "AllowedPaymentMint",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "paymentMint",
                        "type": "publicKey"
                    },
                    {
                        "name": "feeMultiplierBps",
                        "docs": [
                            "fee multiplier in basis points, e.g. 7500 for 25% off"
                        ],
                        "type": "u16"
                    }
                ]
            }
        }
    ],
    "types": [
        {
            "name": "CompletionReceipt",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "seller",
                        "type": "publicKey"
                    },
                    {
                        "name": "soldNftMint",
                        "type": "publicKey"
                    },
                    {
                        "name": "saleTs",
                        "type": "i64"
                    }
                ]
            }
        },
        {
            "name": "MerkleTree",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "root",
                        "type": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    },
                    {
                        "name": "arweaveAddress",
                        "docs": [
                            "the part that goes after arweave.net/ in the URI of file with the full set",
                            "such as b\"eSUeGbehTEAYy6P07yWQCpUMi947WaqCA6gI4NWejcM\""
                        ],
                        "type": {
                            "array": [
                                "u8",
                                43
                            ]
                        }
                    }
                ]
            }
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "DuplicateNFT",
            "msg": "Cannot pass the same NFT several times"
        },
        {
            "code": 6001,
            "name": "ConstraintCollection",
            "msg": "NFT collection is not as expected or is not verified"
        },
        {
            "code": 6002,
            "name": "OrderNotOpen",
            "msg": "Order is not open"
        },
        {
            "code": 6003,
            "name": "NFTNotInSet",
            "msg": "NFT is not in set"
        },
        {
            "code": 6004,
            "name": "UndefinedNftSet",
            "msg": "Neither collection address nor merkle root were provided"
        },
        {
            "code": 6005,
            "name": "PaymentMintNotNative",
            "msg": "Payment mint is not native"
        },
        {
            "code": 6006,
            "name": "PriceMismatch",
            "msg": "Price mismatch"
        }
    ]
};

export const IDL: Caboz = {
    "version": "0.1.0",
    "name": "caboz",
    "constants": [
        {
            "name": "MINT_LIST_AUTHORITY",
            "type": "publicKey",
            "value": "pubkey ! (\"2cJ9pLhz8cvqVi5eaiPLZS5WWDMzD18PhJ9uc4NRQ6PG\")"
        },
        {
            "name": "FEE_RECEIVER",
            "type": "publicKey",
            "value": "pubkey ! (\"GYFSYhaagL1Z9njJbAUj4uvrU2uvPPL6vJJhn7MqL55y\")"
        },
        {
            "name": "INKWORK_COLLECTION_MINT",
            "type": "publicKey",
            "value": "pubkey ! (\"FdkitqFFz7U65o3v7kjQ6neNGz3DwdQ36pqCELcsMG9s\")"
        }
    ],
    "instructions": [
        {
            "name": "allowPaymentMint",
            "docs": [
                "whitelist mint to allow orders in it"
            ],
            "accounts": [
                {
                    "name": "mintListAuthority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "paymentMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "allowedPaymentMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "feeMultiplierBps",
                    "type": "u16"
                }
            ]
        },
        {
            "name": "disallowPaymentMint",
            "docs": [
                "remove payment mint from whitelist,",
                "can be used in combination with `allow_payment_mint` to change fee multiplier"
            ],
            "accounts": [
                {
                    "name": "mintListAuthority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "allowedPaymentMint",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "createOrder",
            "docs": [
                "create an order, passing up to 10 buyer's Inkwork NFT",
                "pairs of (TokenAccount, Metadata) in remaining_accounts"
            ],
            "accounts": [
                {
                    "name": "buyer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "order",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "allowedPaymentMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "price",
                    "type": "u64"
                },
                {
                    "name": "collectionMint",
                    "type": "publicKey"
                },
                {
                    "name": "nftSet",
                    "type": {
                        "defined": "MerkleTree"
                    }
                }
            ]
        },
        {
            "name": "acceptOrderNative",
            "docs": [
                "sell NFT for SOL"
            ],
            "accounts": [
                {
                    "name": "buyer",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "buyerWallet",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "buyerNftTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "order",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "nftMetadata",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "seller",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "sellerNftTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeReceiver",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "expectedPrice",
                    "type": "u64"
                },
                {
                    "name": "proof",
                    "type": {
                        "vec": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    }
                }
            ]
        },
        {
            "name": "acceptOrderNonNative",
            "docs": [
                "sell NFT for an SPL token"
            ],
            "accounts": [
                {
                    "name": "acceptOrder",
                    "accounts": [
                        {
                            "name": "buyer",
                            "isMut": false,
                            "isSigner": false
                        },
                        {
                            "name": "buyerWallet",
                            "isMut": true,
                            "isSigner": false
                        },
                        {
                            "name": "buyerNftTokenAccount",
                            "isMut": true,
                            "isSigner": false
                        },
                        {
                            "name": "order",
                            "isMut": true,
                            "isSigner": false
                        },
                        {
                            "name": "nftMetadata",
                            "isMut": false,
                            "isSigner": false
                        },
                        {
                            "name": "seller",
                            "isMut": true,
                            "isSigner": true
                        },
                        {
                            "name": "sellerNftTokenAccount",
                            "isMut": true,
                            "isSigner": false
                        },
                        {
                            "name": "feeReceiver",
                            "isMut": true,
                            "isSigner": false
                        },
                        {
                            "name": "tokenProgram",
                            "isMut": false,
                            "isSigner": false
                        },
                        {
                            "name": "systemProgram",
                            "isMut": false,
                            "isSigner": false
                        }
                    ]
                },
                {
                    "name": "buyerWalletTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "sellerTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeReceiverTokenAccount",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "expectedPrice",
                    "type": "u64"
                },
                {
                    "name": "proof",
                    "type": {
                        "vec": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    }
                }
            ]
        },
        {
            "name": "closeOrder",
            "docs": [
                "make order unavailable for trading"
            ],
            "accounts": [
                {
                    "name": "buyer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "order",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "createWallet",
            "docs": [
                "create a virtual wallet to then deposit tokens into it"
            ],
            "accounts": [
                {
                    "name": "buyer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "buyerWallet",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "withdrawNative",
            "docs": [
                "withdraw SOL from a wallet"
            ],
            "accounts": [
                {
                    "name": "buyer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "buyerWallet",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "lamports",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "withdrawNonNative",
            "docs": [
                "withdraw SPL tokens from wallet's token account"
            ],
            "accounts": [
                {
                    "name": "withdraw",
                    "accounts": [
                        {
                            "name": "buyer",
                            "isMut": true,
                            "isSigner": true
                        },
                        {
                            "name": "buyerWallet",
                            "isMut": true,
                            "isSigner": false
                        }
                    ]
                },
                {
                    "name": "buyerWalletTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "destination",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "Order",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "buyer",
                        "type": "publicKey"
                    },
                    {
                        "name": "completionReceipt",
                        "docs": [
                            "zeroed if order is open"
                        ],
                        "type": {
                            "defined": "CompletionReceipt"
                        }
                    },
                    {
                        "name": "paymentMint",
                        "type": "publicKey"
                    },
                    {
                        "name": "price",
                        "type": "u64"
                    },
                    {
                        "name": "buyerInkworkNftCount",
                        "docs": [
                            "amount of buyer's Inkwork NFTs at the moment of order creation.",
                            "may be used to prioritize holders"
                        ],
                        "type": "u8"
                    },
                    {
                        "name": "fee",
                        "type": "u64"
                    },
                    {
                        "name": "collectionMint",
                        "docs": [
                            "address of desired collection mint.",
                            "zeroed if none"
                        ],
                        "type": "publicKey"
                    },
                    {
                        "name": "nftSet",
                        "docs": [
                            "the set of wanted NFTs.",
                            "zeroed if none"
                        ],
                        "type": {
                            "defined": "MerkleTree"
                        }
                    },
                    {
                        "name": "creationTs",
                        "docs": [
                            "creation timestamp"
                        ],
                        "type": "i64"
                    }
                ]
            }
        },
        {
            "name": "AllowedPaymentMint",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "paymentMint",
                        "type": "publicKey"
                    },
                    {
                        "name": "feeMultiplierBps",
                        "docs": [
                            "fee multiplier in basis points, e.g. 7500 for 25% off"
                        ],
                        "type": "u16"
                    }
                ]
            }
        }
    ],
    "types": [
        {
            "name": "CompletionReceipt",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "seller",
                        "type": "publicKey"
                    },
                    {
                        "name": "soldNftMint",
                        "type": "publicKey"
                    },
                    {
                        "name": "saleTs",
                        "type": "i64"
                    }
                ]
            }
        },
        {
            "name": "MerkleTree",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "root",
                        "type": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    },
                    {
                        "name": "arweaveAddress",
                        "docs": [
                            "the part that goes after arweave.net/ in the URI of file with the full set",
                            "such as b\"eSUeGbehTEAYy6P07yWQCpUMi947WaqCA6gI4NWejcM\""
                        ],
                        "type": {
                            "array": [
                                "u8",
                                43
                            ]
                        }
                    }
                ]
            }
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "DuplicateNFT",
            "msg": "Cannot pass the same NFT several times"
        },
        {
            "code": 6001,
            "name": "ConstraintCollection",
            "msg": "NFT collection is not as expected or is not verified"
        },
        {
            "code": 6002,
            "name": "OrderNotOpen",
            "msg": "Order is not open"
        },
        {
            "code": 6003,
            "name": "NFTNotInSet",
            "msg": "NFT is not in set"
        },
        {
            "code": 6004,
            "name": "UndefinedNftSet",
            "msg": "Neither collection address nor merkle root were provided"
        },
        {
            "code": 6005,
            "name": "PaymentMintNotNative",
            "msg": "Payment mint is not native"
        },
        {
            "code": 6006,
            "name": "PriceMismatch",
            "msg": "Price mismatch"
        }
    ]
};
