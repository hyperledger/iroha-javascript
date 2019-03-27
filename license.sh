git ls-files '*.js' |\
  while FS='\n' read fff; do
    cat $fff |\
      awk 'BEGIN{skipped_comment = 0;
        print "/**\n * Copyright Soramitsu Co., Ltd. All Rights Reserved.\n * SPDX-License-Identifier: Apache-2.0\n */\n"}
        {if (skipped_comment) print $0}
        {skipped_comment = 1}' | sponge $fff
  done