import React, { useEffect, useState } from 'react';
import Blockies from 'react-blockies';
import UAuth from '@uauth/js';

const truncateAddress = (address) => {
  return address.slice(0, 8) + '...' + address.slice(-4);
};

const uauth = new UAuth({
  clientID: 'e161bc5c-24ea-41a1-952e-de984c8cd260',
  redirectUri:
    process.env.NODE_ENV === 'production'
      ? 'https://ud-search.vercel.app/'
      : 'http://localhost:3000',
});

const ConnectWallet = () => {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [ address, setAddress ] = useState();

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    if (!address) {
      const { ethereum } = window;
      try {
        if (!ethereum) {
          sethaveMetamask(false);
        }
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAddress(accounts[0]);

      } catch (error) {
        console.error(error);
      }
    }
  };

  const connectUnstoppable = async () => {
    try {
      const authorization = await uauth.loginWithPopup();

      if (authorization.idToken.wallet_address) {
        setAddress(authorization.idToken.wallet_address);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    uauth
    .logout()
    .then(() => {
      setAddress(null)
    })
    .catch(error => {
      console.error('profile error:', error)
    })
  }

  return (
    <div className="udbutton">
      {address && (
        <Blockies
          className="rounded-full"
          seed={address.toLowerCase()}
          size={10}
          scale={3}
        />
      )}
      {address ? (
        <>
          <div className="">

            {address}

          </div>
          <div>
            <button
              className="udbutton"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <div>
          <button
            className="udbutton"
            onClick={connectUnstoppable}
          >
            Login with unstoppable
          </button>
          <button
            className=""
            onClick={connectWallet}
          >
            {haveMetamask ? 'Connect Wallet' : 'Install metamask'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;