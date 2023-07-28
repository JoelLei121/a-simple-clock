export default function PlateClock({ time = { hour: 0, minute: 0, second: 0 }, scale = 1 }) {
    return (
        <div style={{ width: `${200 * scale}px`, height: `${200 * scale}px` }}>
            <svg width='100%' height='100%' viewBox="0 0 200 200" >
                {/* clock plate shadow*/}
                <defs>
                    <radialGradient id="shadowGradient">
                        <stop offset="90%" stop-color="black" stop-opacity="0" />
                        <stop offset="100%" stop-color="black" stop-opacity="0.5" />
                    </radialGradient>
                </defs>
                {/* secondhand plate*/}
                <g id="secondhand" transform={`rotate(${-time.second * 6} 100 100)`} style={{ fontFamily: 'BenchNine, sans-serif', fontSize: '5px' }} >
                    <circle cx="100" cy="100" r="95" stroke="black" stroke-width="10" fill="none" />
                    <circle cx="100" cy="100" r="95" fill="white" />
                    <circle cx="100" cy="100" r="95" fill="url(#shadowGradient)" />
                    <text x="182" y="103" style={{ transform: "rotate(0deg)", transformOrigin: "100px 100px" }}>0</text>
                    <text x="182" y="103" style={{ transform: "rotate(6deg)", transformOrigin: "100px 100px" }}>1</text>
                    <text x="182" y="103" style={{ transform: "rotate(12deg)", transformOrigin: "100px 100px" }}>2</text>
                    <text x="182" y="103" style={{ transform: "rotate(18deg)", transformOrigin: "100px 100px" }}>3</text>
                    <text x="182" y="103" style={{ transform: "rotate(24deg)", transformOrigin: "100px 100px" }}>4</text>
                    <text x="182" y="103" style={{ transform: "rotate(30deg)", transformOrigin: "100px 100px" }}>5</text>
                    <text x="182" y="103" style={{ transform: "rotate(36deg)", transformOrigin: "100px 100px" }}>6</text>
                    <text x="182" y="103" style={{ transform: "rotate(42deg)", transformOrigin: "100px 100px" }}>7</text>
                    <text x="182" y="103" style={{ transform: "rotate(48deg)", transformOrigin: "100px 100px" }}>8</text>
                    <text x="182" y="103" style={{ transform: "rotate(54deg)", transformOrigin: "100px 100px" }}>9</text>
                    <text x="180" y="103" style={{ transform: "rotate(60deg)", transformOrigin: "100px 100px" }}>10</text>
                    <text x="180" y="103" style={{ transform: "rotate(66deg)", transformOrigin: "100px 100px" }}>11</text>
                    <text x="180" y="103" style={{ transform: "rotate(72deg)", transformOrigin: "100px 100px" }}>12</text>
                    <text x="180" y="103" style={{ transform: "rotate(78deg)", transformOrigin: "100px 100px" }}>13</text>
                    <text x="180" y="103" style={{ transform: "rotate(84deg)", transformOrigin: "100px 100px" }}>14</text>
                    <text x="180" y="103" style={{ transform: "rotate(90deg)", transformOrigin: "100px 100px" }}>15</text>
                    <text x="180" y="103" style={{ transform: "rotate(96deg)", transformOrigin: "100px 100px" }}>16</text>
                    <text x="180" y="103" style={{ transform: "rotate(102deg)", transformOrigin: "100px 100px" }}>17</text>
                    <text x="180" y="103" style={{ transform: "rotate(108deg)", transformOrigin: "100px 100px" }}>18</text>
                    <text x="180" y="103" style={{ transform: "rotate(114deg)", transformOrigin: "100px 100px" }}>19</text>
                    <text x="180" y="103" style={{ transform: "rotate(120deg)", transformOrigin: "100px 100px" }}>20</text>
                    <text x="180" y="103" style={{ transform: "rotate(126deg)", transformOrigin: "100px 100px" }}>21</text>
                    <text x="180" y="103" style={{ transform: "rotate(132deg)", transformOrigin: "100px 100px" }}>22</text>
                    <text x="180" y="103" style={{ transform: "rotate(138deg)", transformOrigin: "100px 100px" }}>23</text>
                    <text x="180" y="103" style={{ transform: "rotate(144deg)", transformOrigin: "100px 100px" }}>24</text>
                    <text x="180" y="103" style={{ transform: "rotate(150deg)", transformOrigin: "100px 100px" }}>25</text>
                    <text x="180" y="103" style={{ transform: "rotate(156deg)", transformOrigin: "100px 100px" }}>26</text>
                    <text x="180" y="103" style={{ transform: "rotate(162deg)", transformOrigin: "100px 100px" }}>27</text>
                    <text x="180" y="103" style={{ transform: "rotate(168deg)", transformOrigin: "100px 100px" }}>28</text>
                    <text x="180" y="103" style={{ transform: "rotate(174deg)", transformOrigin: "100px 100px" }}>29</text>
                    <text x="180" y="103" style={{ transform: "rotate(180deg)", transformOrigin: "100px 100px" }}>30</text>
                    <text x="180" y="103" style={{ transform: "rotate(186deg)", transformOrigin: "100px 100px" }}>31</text>
                    <text x="180" y="103" style={{ transform: "rotate(192deg)", transformOrigin: "100px 100px" }}>32</text>
                    <text x="180" y="103" style={{ transform: "rotate(198deg)", transformOrigin: "100px 100px" }}>33</text>
                    <text x="180" y="103" style={{ transform: "rotate(204deg)", transformOrigin: "100px 100px" }}>34</text>
                    <text x="180" y="103" style={{ transform: "rotate(210deg)", transformOrigin: "100px 100px" }}>35</text>
                    <text x="180" y="103" style={{ transform: "rotate(216deg)", transformOrigin: "100px 100px" }}>36</text>
                    <text x="180" y="103" style={{ transform: "rotate(222deg)", transformOrigin: "100px 100px" }}>37</text>
                    <text x="180" y="103" style={{ transform: "rotate(228deg)", transformOrigin: "100px 100px" }}>38</text>
                    <text x="180" y="103" style={{ transform: "rotate(234deg)", transformOrigin: "100px 100px" }}>39</text>
                    <text x="180" y="103" style={{ transform: "rotate(240deg)", transformOrigin: "100px 100px" }}>40</text>
                    <text x="180" y="103" style={{ transform: "rotate(246deg)", transformOrigin: "100px 100px" }}>41</text>
                    <text x="180" y="103" style={{ transform: "rotate(252deg)", transformOrigin: "100px 100px" }}>42</text>
                    <text x="180" y="103" style={{ transform: "rotate(258deg)", transformOrigin: "100px 100px" }}>43</text>
                    <text x="180" y="103" style={{ transform: "rotate(264deg)", transformOrigin: "100px 100px" }}>44</text>
                    <text x="180" y="103" style={{ transform: "rotate(270deg)", transformOrigin: "100px 100px" }}>45</text>
                    <text x="180" y="103" style={{ transform: "rotate(276deg)", transformOrigin: "100px 100px" }}>46</text>
                    <text x="180" y="103" style={{ transform: "rotate(282deg)", transformOrigin: "100px 100px" }}>47</text>
                    <text x="180" y="103" style={{ transform: "rotate(288deg)", transformOrigin: "100px 100px" }}>48</text>
                    <text x="180" y="103" style={{ transform: "rotate(294deg)", transformOrigin: "100px 100px" }}>49</text>
                    <text x="180" y="103" style={{ transform: "rotate(300deg)", transformOrigin: "100px 100px" }}>50</text>
                    <text x="180" y="103" style={{ transform: "rotate(306deg)", transformOrigin: "100px 100px" }}>51</text>
                    <text x="180" y="103" style={{ transform: "rotate(312deg)", transformOrigin: "100px 100px" }}>52</text>
                    <text x="180" y="103" style={{ transform: "rotate(318deg)", transformOrigin: "100px 100px" }}>53</text>
                    <text x="180" y="103" style={{ transform: "rotate(324deg)", transformOrigin: "100px 100px" }}>54</text>
                    <text x="180" y="103" style={{ transform: "rotate(330deg)", transformOrigin: "100px 100px" }}>55</text>
                    <text x="180" y="103" style={{ transform: "rotate(336deg)", transformOrigin: "100px 100px" }}>56</text>
                    <text x="180" y="103" style={{ transform: "rotate(342deg)", transformOrigin: "100px 100px" }}>57</text>
                    <text x="180" y="103" style={{ transform: "rotate(348deg)", transformOrigin: "100px 100px" }}>58</text>
                    <text x="180" y="103" style={{ transform: "rotate(354deg)", transformOrigin: "100px 100px" }}>59</text>
                </g>
                {/* minutehand plate */}
                <g id="minutehand" transform={`rotate(${-time.minute * 6} 100 100)`} style={{ fontFamily: 'BenchNine, sans-serif', fontSize: '6px' }}>
                    <circle cx="100" cy="100" r="75" fill="black" />
                    <text x="161.8" y="102" style={{ transform: "rotate(0deg)", transformOrigin: "100px 100px", fill: "white" }}>0</text>
                    <text x="161.8" y="102" style={{ transform: "rotate(6deg)", transformOrigin: "100px 100px", fill: "white" }}>1</text>
                    <text x="161.8" y="102" style={{ transform: "rotate(12deg)", transformOrigin: "100px 100px", fill: "white" }}>2</text>
                    <text x="161.8" y="102" style={{ transform: "rotate(18deg)", transformOrigin: "100px 100px", fill: "white" }}>3</text>
                    <text x="161.8" y="102" style={{ transform: "rotate(24deg)", transformOrigin: "100px 100px", fill: "white" }}>4</text>
                    <text x="161.8" y="102" style={{ transform: "rotate(30deg)", transformOrigin: "100px 100px", fill: "white" }}>5</text>
                    <text x="161.8" y="102" style={{ transform: "rotate(36deg)", transformOrigin: "100px 100px", fill: "white" }}>6</text>
                    <text x="161.8" y="102" style={{ transform: "rotate(42deg)", transformOrigin: "100px 100px", fill: "white" }}>7</text>
                    <text x="161.8" y="102" style={{ transform: "rotate(48deg)", transformOrigin: "100px 100px", fill: "white" }}>8</text>
                    <text x="161.8" y="102" style={{ transform: "rotate(54deg)", transformOrigin: "100px 100px", fill: "white" }}>9</text>
                    <text x="160" y="102" style={{ transform: "rotate(60deg)", transformOrigin: "100px 100px", fill: "white" }}>10</text>
                    <text x="160" y="102" style={{ transform: "rotate(66deg)", transformOrigin: "100px 100px", fill: "white" }}>11</text>
                    <text x="160" y="102" style={{ transform: "rotate(72deg)", transformOrigin: "100px 100px", fill: "white" }}>12</text>
                    <text x="160" y="102" style={{ transform: "rotate(78deg)", transformOrigin: "100px 100px", fill: "white" }}>13</text>
                    <text x="160" y="102" style={{ transform: "rotate(84deg)", transformOrigin: "100px 100px", fill: "white" }}>14</text>
                    <text x="160" y="102" style={{ transform: "rotate(90deg)", transformOrigin: "100px 100px", fill: "white" }}>15</text>
                    <text x="160" y="102" style={{ transform: "rotate(96deg)", transformOrigin: "100px 100px", fill: "white" }}>16</text>
                    <text x="160" y="102" style={{ transform: "rotate(102deg)", transformOrigin: "100px 100px", fill: "white" }}>17</text>
                    <text x="160" y="102" style={{ transform: "rotate(108deg)", transformOrigin: "100px 100px", fill: "white" }}>18</text>
                    <text x="160" y="102" style={{ transform: "rotate(114deg)", transformOrigin: "100px 100px", fill: "white" }}>19</text>
                    <text x="160" y="102" style={{ transform: "rotate(120deg)", transformOrigin: "100px 100px", fill: "white" }}>20</text>
                    <text x="160" y="102" style={{ transform: "rotate(126deg)", transformOrigin: "100px 100px", fill: "white" }}>21</text>
                    <text x="160" y="102" style={{ transform: "rotate(132deg)", transformOrigin: "100px 100px", fill: "white" }}>22</text>
                    <text x="160" y="102" style={{ transform: "rotate(138deg)", transformOrigin: "100px 100px", fill: "white" }}>23</text>
                    <text x="160" y="102" style={{ transform: "rotate(144deg)", transformOrigin: "100px 100px", fill: "white" }}>24</text>
                    <text x="160" y="102" style={{ transform: "rotate(150deg)", transformOrigin: "100px 100px", fill: "white" }}>25</text>
                    <text x="160" y="102" style={{ transform: "rotate(156deg)", transformOrigin: "100px 100px", fill: "white" }}>26</text>
                    <text x="160" y="102" style={{ transform: "rotate(162deg)", transformOrigin: "100px 100px", fill: "white" }}>27</text>
                    <text x="160" y="102" style={{ transform: "rotate(168deg)", transformOrigin: "100px 100px", fill: "white" }}>28</text>
                    <text x="160" y="102" style={{ transform: "rotate(174deg)", transformOrigin: "100px 100px", fill: "white" }}>29</text>
                    <text x="160" y="102" style={{ transform: "rotate(180deg)", transformOrigin: "100px 100px", fill: "white" }}>30</text>
                    <text x="160" y="102" style={{ transform: "rotate(186deg)", transformOrigin: "100px 100px", fill: "white" }}>31</text>
                    <text x="160" y="102" style={{ transform: "rotate(192deg)", transformOrigin: "100px 100px", fill: "white" }}>32</text>
                    <text x="160" y="102" style={{ transform: "rotate(198deg)", transformOrigin: "100px 100px", fill: "white" }}>33</text>
                    <text x="160" y="102" style={{ transform: "rotate(204deg)", transformOrigin: "100px 100px", fill: "white" }}>34</text>
                    <text x="160" y="102" style={{ transform: "rotate(210deg)", transformOrigin: "100px 100px", fill: "white" }}>35</text>
                    <text x="160" y="102" style={{ transform: "rotate(216deg)", transformOrigin: "100px 100px", fill: "white" }}>36</text>
                    <text x="160" y="102" style={{ transform: "rotate(222deg)", transformOrigin: "100px 100px", fill: "white" }}>37</text>
                    <text x="160" y="102" style={{ transform: "rotate(228deg)", transformOrigin: "100px 100px", fill: "white" }}>38</text>
                    <text x="160" y="102" style={{ transform: "rotate(234deg)", transformOrigin: "100px 100px", fill: "white" }}>39</text>
                    <text x="160" y="102" style={{ transform: "rotate(240deg)", transformOrigin: "100px 100px", fill: "white" }}>40</text>
                    <text x="160" y="102" style={{ transform: "rotate(246deg)", transformOrigin: "100px 100px", fill: "white" }}>41</text>
                    <text x="160" y="102" style={{ transform: "rotate(252deg)", transformOrigin: "100px 100px", fill: "white" }}>42</text>
                    <text x="160" y="102" style={{ transform: "rotate(258deg)", transformOrigin: "100px 100px", fill: "white" }}>43</text>
                    <text x="160" y="102" style={{ transform: "rotate(264deg)", transformOrigin: "100px 100px", fill: "white" }}>44</text>
                    <text x="160" y="102" style={{ transform: "rotate(270deg)", transformOrigin: "100px 100px", fill: "white" }}>45</text>
                    <text x="160" y="102" style={{ transform: "rotate(276deg)", transformOrigin: "100px 100px", fill: "white" }}>46</text>
                    <text x="160" y="102" style={{ transform: "rotate(282deg)", transformOrigin: "100px 100px", fill: "white" }}>47</text>
                    <text x="160" y="102" style={{ transform: "rotate(288deg)", transformOrigin: "100px 100px", fill: "white" }}>48</text>
                    <text x="160" y="102" style={{ transform: "rotate(294deg)", transformOrigin: "100px 100px", fill: "white" }}>49</text>
                    <text x="160" y="102" style={{ transform: "rotate(300deg)", transformOrigin: "100px 100px", fill: "white" }}>50</text>
                    <text x="160" y="102" style={{ transform: "rotate(306deg)", transformOrigin: "100px 100px", fill: "white" }}>51</text>
                    <text x="160" y="102" style={{ transform: "rotate(312deg)", transformOrigin: "100px 100px", fill: "white" }}>52</text>
                    <text x="160" y="102" style={{ transform: "rotate(318deg)", transformOrigin: "100px 100px", fill: "white" }}>53</text>
                    <text x="160" y="102" style={{ transform: "rotate(324deg)", transformOrigin: "100px 100px", fill: "white" }}>54</text>
                    <text x="160" y="102" style={{ transform: "rotate(330deg)", transformOrigin: "100px 100px", fill: "white" }}>55</text>
                    <text x="160" y="102" style={{ transform: "rotate(336deg)", transformOrigin: "100px 100px", fill: "white" }}>56</text>
                    <text x="160" y="102" style={{ transform: "rotate(342deg)", transformOrigin: "100px 100px", fill: "white" }}>57</text>
                    <text x="160" y="102" style={{ transform: "rotate(348deg)", transformOrigin: "100px 100px", fill: "white" }}>58</text>
                    <text x="160" y="102" style={{ transform: "rotate(354deg)", transformOrigin: "100px 100px", fill: "white" }}>59</text>

                </g>
                {/* hourhand plate */}
                <g id="hourhand" transform={`rotate(${-time.hour % 12 * 30} 100 100)`} style={{ fontFamily: 'BenchNine, sans-serif', fontSize: '12px' }}>
                    <circle cx="100" cy="100" r="55" fill="white" />
                    <circle cx="100" cy="100" r="55" fill="url(#shadowGradient)" />
                    <text x="135" y="105" style={{ transform: "rotate(0deg)", transformOrigin: "100px 100px" }}>12</text>
                    <text x="140" y="105" style={{ transform: "rotate(30deg)", transformOrigin: "100px 100px" }}>1</text>
                    <text x="140" y="105" style={{ transform: "rotate(60deg)", transformOrigin: "100px 100px" }}>2</text>
                    <text x="140" y="105" style={{ transform: "rotate(90deg)", transformOrigin: "100px 100px" }}>3</text>
                    <text x="140" y="105" style={{ transform: "rotate(120deg)", transformOrigin: "100px 100px" }}>4</text>
                    <text x="140" y="105" style={{ transform: "rotate(150deg)", transformOrigin: "100px 100px" }}>5</text>
                    <text x="140" y="105" style={{ transform: "rotate(180deg)", transformOrigin: "100px 100px" }}>6</text>
                    <text x="140" y="105" style={{ transform: "rotate(210deg)", transformOrigin: "100px 100px" }}>7</text>
                    <text x="140" y="105" style={{ transform: "rotate(240deg)", transformOrigin: "100px 100px" }}>8</text>
                    <text x="140" y="105" style={{ transform: "rotate(270deg)", transformOrigin: "100px 100px" }}>9</text>
                    <text x="135" y="105" style={{ transform: "rotate(300deg)", transformOrigin: "100px 100px" }}>10</text>
                    <text x="135" y="105" style={{ transform: "rotate(330deg)", transformOrigin: "100px 100px" }}>11</text>
                </g>
                {/* center */}
                <g id="circle">
                    <circle style={{ fill: "#ff0000" }} cx="100" cy="100" r="2" />
                    <line x1="100" y1="100" x2="195" y2="100" style={{ strokeWidth: "0.3px", stroke: "#ff0000" }} />
                    <circle style={{ fill: "#ff0000" }} cx="197.5" cy="100" r="2.5" />
                </g>
            </svg>
        </div>
    )
}